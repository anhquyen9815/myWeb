// using DienMayLongQuyen.Api.Data;
// using Microsoft.EntityFrameworkCore;
// using System.Text.Json.Serialization;
// using Microsoft.Extensions.FileProviders;
// using System.IO;
// using System;

// // Top-level app
// var builder = WebApplication.CreateBuilder(args);
// var loggerFactory = LoggerFactory.Create(logging =>
// {
//     logging.AddConsole();
// });
// var logger = loggerFactory.CreateLogger("Startup");

// // ----------------- ROBUST SQLITE SEED & PATH LOGIC ------------------
// // runtime DB path (bạn có thể set env var SQLITE_DB_PATH nếu muốn khác)
// var configuredDbPath = Environment.GetEnvironmentVariable("SQLITE_DB_PATH")
//                       ?? Path.Combine(builder.Environment.ContentRootPath, "longquyen.db");

// // seed DB path inside image (Dockerfile phải copy Seed/longquyen.db vào image)
// var seedPath = Path.Combine(builder.Environment.ContentRootPath, "Seed", "longquyen.db");

// logger.LogInformation("Seed path: {seedPath}", seedPath);
// logger.LogInformation("Configured target db path: {configuredDbPath}", configuredDbPath);
// logger.LogInformation("Seed exists: {seedExists}", File.Exists(seedPath));

// static bool IsDirectoryWritable(string candidateFilePath)
// {
//     try
//     {
//         var dir = Path.GetDirectoryName(candidateFilePath) ?? ".";
//         // Create directory if missing (try-catch to avoid throwing further)
//         if (!Directory.Exists(dir))
//         {
//             Directory.CreateDirectory(dir);
//         }

//         // Try write+delete a small temp file
//         var testFile = Path.Combine(dir, $".writetest_{Guid.NewGuid():N}.tmp");
//         File.WriteAllText(testFile, "test");
//         File.Delete(testFile);
//         return true;
//     }
//     catch
//     {
//         return false;
//     }
// }

// // Decide final dbPath to use; fallback to /tmp if configured path not writable
// var dbPath = configuredDbPath;
// if (!IsDirectoryWritable(dbPath))
// {
//     var fallback = Path.Combine("/tmp", Path.GetFileName(configuredDbPath) ?? "longquyen.db");
//     logger.LogWarning("Configured DB path '{configured}' is not writable — falling back to '{fallback}'", configuredDbPath, fallback);
//     dbPath = fallback;
// }

// logger.LogInformation("Target db path (final): {dbPath}", dbPath);
// logger.LogInformation("Target exists: {dbExists}", File.Exists(dbPath));

// // Ensure directory exists if possible (wrap in try)
// var dbDir = Path.GetDirectoryName(dbPath);
// if (!string.IsNullOrEmpty(dbDir) && !Directory.Exists(dbDir))
// {
//     try
//     {
//         Directory.CreateDirectory(dbDir);
//     }
//     catch (Exception ex)
//     {
//         logger.LogWarning(ex, "Could not create directory for db path '{dbDir}'.", dbDir);
//     }
// }

// // decide whether to force overwrite the runtime DB with seed
// var forceSeed = (Environment.GetEnvironmentVariable("FORCE_SEED") ?? "false").ToLower() == "true";

// if (File.Exists(seedPath))
// {
//     try
//     {
//         if (!IsDirectoryWritable(dbPath))
//         {
//             logger.LogError("Destination db path '{dbPath}' is not writable. Skipping copy of seed DB.", dbPath);
//         }
//         else
//         {
//             if (forceSeed)
//             {
//                 File.Copy(seedPath, dbPath, overwrite: true);
//                 Console.WriteLine($"[DB SEED] FORCE: copied seed DB '{seedPath}' -> '{dbPath}'");
//             }
//             else
//             {
//                 if (!File.Exists(dbPath))
//                 {
//                     File.Copy(seedPath, dbPath);
//                     Console.WriteLine($"[DB SEED] copied seed DB '{seedPath}' -> '{dbPath}'");
//                 }
//                 else
//                 {
//                     Console.WriteLine($"[DB SEED] runtime DB exists at '{dbPath}', skip copy");
//                 }
//             }

//             // Attempt to set permissive permissions on Linux so the app can write
//             if (System.Runtime.InteropServices.RuntimeInformation.IsOSPlatform(System.Runtime.InteropServices.OSPlatform.Linux))
//             {
//                 try
//                 {
//                     var p = System.Diagnostics.Process.Start("chmod", $"666 \"{dbPath}\"");
//                     p?.WaitForExit();
//                 }
//                 catch
//                 {
//                     // ignore chmod failure
//                 }
//             }
//         }
//     }
//     catch (Exception ex)
//     {
//         Console.WriteLine($"[DB SEED] Copy failed: {ex.Message}");
//     }
// }
// else
// {
//     Console.WriteLine($"[DB SEED] Seed DB not found at '{seedPath}'. Make sure Seed/longquyen.db exists in the repo and Dockerfile copies it.");
// }
// // --------------------------------------------------------------------

// // Add services to the container
// builder.Services.AddEndpointsApiExplorer();
// builder.Services.AddSwaggerGen();

// // Kết nối SQLite — dùng dbPath đã chuẩn bị ở trên
// builder.Services.AddDbContext<AppDbContext>(options =>
//     options.UseSqlite($"Data Source={dbPath}"));

// // CORS cho React (http://localhost:5173 hoặc http://localhost:3000)
// builder.Services.AddCors(options =>
// {
//     options.AddPolicy("AllowAll",
//         policy => policy            .AllowAnyOrigin()
//             .AllowAnyMethod()
//             .AllowAnyHeader());
// });

// builder.Services.AddControllers()
//     .AddJsonOptions(opt =>
//     {
//         opt.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
//         opt.JsonSerializerOptions.WriteIndented = true;
//     });

// var app = builder.Build();

// // Thêm UseStaticFiles cho thư mục wwwroot mặc định
// app.UseStaticFiles();

// // --- ÁP MIGRATIONS VÀ CHẠY INITIALIZER (CHỈ 1 NƠI) ---
// using (var scope = app.Services.CreateScope())
// {
//     var services = scope.ServiceProvider;
//     try
//     {
//         var context = services.GetRequiredService<AppDbContext>();

//         // Quyết định có nên apply migrations tự động hay không (mặc định chỉ true ở Development)
//         var wantApplyMigrations = app.Environment.IsDevelopment();
//         logger.LogInformation("Initial applyMigrations desired (from env): {want}", wantApplyMigrations);

//         // Inspect DB: có __EFMigrationsHistory? có bất kỳ bảng nào?
//         bool dbHasMigrationsHistory = false;
//         bool dbHasAnyTables = false;
//         try
//         {
//             var conn = context.Database.GetDbConnection();
//             conn.Open();

//             using (var cmd = conn.CreateCommand())
//             {
//                 cmd.CommandText = "SELECT count(*) FROM sqlite_master WHERE type='table' AND name='__EFMigrationsHistory';";
//                 var result = cmd.ExecuteScalar();
//                 dbHasMigrationsHistory = Convert.ToInt32(result) > 0;
//             }

//             using (var cmd2 = conn.CreateCommand())
//             {
//                 cmd2.CommandText = "SELECT count(*) FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';";
//                 var r2 = cmd2.ExecuteScalar();
//                 dbHasAnyTables = Convert.ToInt32(r2) > 0;
//             }

//             conn.Close();
//         }
//         catch (Exception ex)
//         {
//             logger.LogWarning(ex, "Could not inspect database for migration history — assuming safe default.");
//         }

//         // Logic:
//         // - nếu không có __EFMigrationsHistory nhưng DB đã có bảng (khả năng là seed DB), thì không auto-apply migrations
//         // - nếu có __EFMigrationsHistory thì an toàn để apply migrations (DB được EF quản lý trước đó)
//         var applyMigrations = wantApplyMigrations;

//         if (wantApplyMigrations && !dbHasMigrationsHistory && dbHasAnyTables)
//         {
//             logger.LogWarning("DB file contains tables but no __EFMigrationsHistory table -> skipping auto-apply migrations to avoid 'table already exists' errors.");
//             applyMigrations = false;
//         }

//         logger.LogInformation("Final applyMigrations decision: {apply}", applyMigrations);

//         // DatabaseInitializer xử lý: (tuỳ chọn) apply migrations và chạy triggers
//         await DatabaseInitializer.InitializeAsync(context, logger, applyMigrations);

//         // Seed dữ liệu idempotent — đảm bảo SeedData.Initialize kiểm tra tồn tại trước khi insert
//         SeedData.Initialize(context);
//     }
//     catch (Exception ex)
//     {
//         var log = loggerFactory.CreateLogger<Program>();
//         log.LogError(ex, "An error occurred while initializing the database.");
//         // Tuỳ chọn: throw; // để app không start nếu DB init thất bại
//     }
// }
// // ---------------------------------------------------------------

// // Cấu hình pipeline
// var enableSwagger = builder.Configuration.GetValue<bool>("ENABLE_SWAGGER", false);

// if (enableSwagger || app.Environment.IsDevelopment())
// {
//     app.UseSwagger();
//     app.UseSwaggerUI();
// }

// app.UseHttpsRedirection();
// app.UseCors("AllowAll");
// app.UseAuthorization();

// app.UseRouting();
// app.MapControllers();

// // *** DÒNG GIẢI QUYẾT LỖI 404 KHI RELOAD ***
// app.MapFallbackToFile("index.html");

// app.Run();
