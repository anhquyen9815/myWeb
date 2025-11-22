using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DienMayLongQuyen.Api.Migrations
{
    /// <inheritdoc />
    public partial class Baseline4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CategoryId",
                table: "ProductModelGroups",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ProductModelGroups_CategoryId",
                table: "ProductModelGroups",
                column: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductModelGroups_Categories_CategoryId",
                table: "ProductModelGroups",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductModelGroups_Categories_CategoryId",
                table: "ProductModelGroups");

            migrationBuilder.DropIndex(
                name: "IX_ProductModelGroups_CategoryId",
                table: "ProductModelGroups");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "ProductModelGroups");
        }
    }
}
