using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DienMayLongQuyen.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddAttributeDefinitionIdToProductAttributeOptions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
             // 1) Thêm cột nullable trước để tránh lỗi copy table trên SQLite
        migrationBuilder.AddColumn<int>(
            name: "AttributeDefinitionId",
            table: "ProductAttributeOptions",
            type: "INTEGER",
            nullable: true);

        // 2) Backfill: gán AttributeDefinitionId dựa trên AttributeOption.AttributeDefinitionId
        // SQLite hỗ trợ subquery trong UPDATE
        migrationBuilder.Sql(@"
            UPDATE ProductAttributeOptions
            SET AttributeDefinitionId = (
                SELECT AttributeDefinitionId
                FROM AttributeOptions
                WHERE AttributeOptions.Id = ProductAttributeOptions.AttributeOptionId
                LIMIT 1
            )
            WHERE AttributeOptionId IS NOT NULL;
        ");

        // 3) Tạo index (tùy chọn)
        migrationBuilder.CreateIndex(
            name: "IX_ProductAttributeOptions_AttributeDefinitionId",
            table: "ProductAttributeOptions",
            column: "AttributeDefinitionId");

        // 4) Thêm foreign key (nullable FK)
        migrationBuilder.AddForeignKey(
            name: "FK_ProductAttributeOptions_AttributeDefinitions_AttributeDefinitionId",
            table: "ProductAttributeOptions",
            column: "AttributeDefinitionId",
            principalTable: "AttributeDefinitions",
            principalColumn: "Id",
            onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductAttributeOptions_AttributeDefinitions_AttributeDefinitionId",
                table: "ProductAttributeOptions");

            migrationBuilder.DropIndex(
                name: "IX_ProductAttributeOptions_AttributeDefinitionId",
                table: "ProductAttributeOptions");

            migrationBuilder.DropColumn(
                name: "AttributeDefinitionId",
                table: "ProductAttributeOptions");
        }
    }
}
