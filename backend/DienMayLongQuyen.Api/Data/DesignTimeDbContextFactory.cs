using DienMayLongQuyen.Api.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Data.Sqlite;
using System;
using System.IO;

public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
{
    public AppDbContext CreateDbContext(string[] args)
    {
        // Giống logic runtime — đảm bảo EF CLI dùng đúng file longquyen.db
        var baseDir = Directory.GetCurrentDirectory();
        var dbPath = Path.Combine(baseDir, "longquyen.db");
        var connStr = $"Data Source={dbPath}";

        var optionsBuilder = new DbContextOptionsBuilder<AppDbContext>();
        optionsBuilder.UseSqlite(connStr);

        Console.WriteLine("[DesignTime Factory] Using DB Path: " + dbPath);

        return new AppDbContext(optionsBuilder.Options);
    }
}
