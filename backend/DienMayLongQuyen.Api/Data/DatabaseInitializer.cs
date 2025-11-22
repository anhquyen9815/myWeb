using System;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace DienMayLongQuyen.Api.Data
{
    public static class DatabaseInitializer
    {
        /// <summary>
        /// Khởi tạo DB: (tuỳ chọn) áp migrations, rồi chạy triggers.sql (idempotent).
        /// Thay đổi: kiểm tra existence của bảng target trước khi chạy trigger SQL để tránh "no such table".
        /// </summary>
        public static async Task InitializeAsync(
            AppDbContext context,
            ILogger logger,
            bool applyMigrations = false,
            int maxRetries = 5)
        {
            try
            {
                // 1) Tuỳ chọn: áp migrations (để Program.cs kiểm soát)
                if (applyMigrations)
                {
                    logger.LogInformation("Applying migrations...");
                    await context.Database.MigrateAsync();
                    logger.LogInformation("Migrations applied.");
                }
                else
                {
                    logger.LogInformation("Skipping migrations (applyMigrations = false).");
                }

                // 2) Tìm triggers.sql
                var baseDir = AppContext.BaseDirectory;
                logger.LogInformation("App base directory: {baseDir}", baseDir);

                var candidatePaths = new[]
                {
                    Path.Combine(baseDir, "Data", "triggers.sql"),
                    Path.Combine(baseDir, "triggers.sql"),
                    Path.Combine(Directory.GetCurrentDirectory(), "Data", "triggers.sql"),
                    Path.Combine(Directory.GetCurrentDirectory(), "triggers.sql")
                };

                string? filePath = null;
                foreach (var p in candidatePaths)
                {
                    logger.LogDebug("Checking for triggers file: {p}", p);
                    if (File.Exists(p))
                    {
                        filePath = p;
                        break;
                    }
                }

                if (filePath == null)
                {
                    logger.LogWarning("triggers.sql not found. Skipping trigger initialization. Looked at: {paths}",
                        string.Join("; ", candidatePaths));
                    return;
                }

                logger.LogInformation("Found triggers file: {filePath}", filePath);

                // 3) Đọc nội dung
                var sql = await File.ReadAllTextAsync(filePath);
                if (string.IsNullOrWhiteSpace(sql))
                {
                    logger.LogWarning("triggers.sql is empty. Nothing to run.");
                    return;
                }

                // 4) Extract referenced table names from SQL (basic heuristic: find "ON <TableName>" occurrences)
                var referencedTables = ExtractReferencedTables(sql).Distinct(StringComparer.OrdinalIgnoreCase).ToList();
                if (referencedTables.Count == 0)
                {
                    logger.LogDebug("No referenced tables found in triggers.sql (heuristic). Proceeding to execute SQL.");
                }
                else
                {
                    logger.LogInformation("Referenced tables in triggers.sql: {tables}", string.Join(", ", referencedTables));
                }

                // 5) Check existence of referenced tables in the current DB
                var missingTables = await GetMissingTablesAsync(context, referencedTables);
                if (missingTables.Count > 0)
                {
                    logger.LogWarning("The following tables referenced by triggers.sql are missing in the database: {missing}. Skipping trigger creation.",
                        string.Join(", ", missingTables));
                    return;
                }

                // 6) Thực thi SQL với retry (SQLite có thể lock)
                for (int attempt = 1; attempt <= maxRetries; attempt++)
                {
                    try
                    {
                        logger.LogInformation("Executing triggers (attempt {attempt})...", attempt);
                        await using var tx = await context.Database.BeginTransactionAsync();
                        await context.Database.ExecuteSqlRawAsync(sql);
                        await tx.CommitAsync();
                        logger.LogInformation("Triggers executed successfully.");
                        return;
                    }
                    catch (SqliteException sqlEx)
                    {
                        logger.LogWarning(sqlEx, "SqliteException while executing triggers (attempt {attempt}).", attempt);
                        if (attempt == maxRetries) throw;
                        await Task.Delay(1000 * attempt);
                    }
                    catch (DbUpdateException dbEx)
                    {
                        logger.LogWarning(dbEx, "DbUpdateException while executing triggers (attempt {attempt}).", attempt);
                        if (attempt == maxRetries) throw;
                        await Task.Delay(1000 * attempt);
                    }
                }
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Database initialization failed.");
            }
        }

        /// <summary>
        /// Basic heuristic to extract table names referenced after "ON" keyword in trigger statements.
        /// This will catch patterns like "AFTER INSERT ON Products" or "AFTER UPDATE ON \"Products\"".
        /// It's intentionally simple — if your triggers.sql uses unusual SQL, adapt this regex.
        /// </summary>
        private static string[] ExtractReferencedTables(string sql)
        {
            if (string.IsNullOrWhiteSpace(sql)) return Array.Empty<string>();

            // Regex: find "ON <optional quote>Identifier<same optional quote>"
            // Matches ON Products, ON "Products", ON [Products] (basic)
            var regex = new Regex(@"\bON\s+(?:`?""?\[?)([A-Za-z0-9_]+)(?:`?""?\]?)(?!\w)", RegexOptions.IgnoreCase);
            var matches = regex.Matches(sql);
            return matches.Select(m => m.Groups[1].Value).Where(v => !string.IsNullOrWhiteSpace(v)).ToArray();
        }

        /// <summary>
        /// Query sqlite_master to see which of referencedTables do not exist.
        /// If referencedTables is empty, returns empty list.
        /// </summary>
        private static async Task<System.Collections.Generic.List<string>> GetMissingTablesAsync(AppDbContext context, System.Collections.Generic.List<string> referencedTables)
        {
            var missing = new System.Collections.Generic.List<string>();
            if (referencedTables == null || referencedTables.Count == 0) return missing;

            var conn = context.Database.GetDbConnection();
            try
            {
                await conn.OpenAsync();
                foreach (var t in referencedTables)
                {
                    try
                    {
                        using var cmd = conn.CreateCommand();
                        // check in main schema only; ignore sqlite_ internal tables
                        cmd.CommandText = "SELECT COUNT(*) FROM sqlite_master WHERE type='table' AND name = @name;";
                        var param = cmd.CreateParameter();
                        param.ParameterName = "@name";
                        param.Value = t;
                        cmd.Parameters.Add(param);

                        var result = cmd.ExecuteScalar();
                        var exists = Convert.ToInt32(result) > 0;
                        if (!exists) missing.Add(t);
                    }
                    catch
                    {
                        // If check fails for a table, treat as missing to be safe
                        missing.Add(t);
                    }
                }
            }
            finally
            {
                try { conn.Close(); } catch { /* ignore */ }
            }

            return missing;
        }
    }
}
