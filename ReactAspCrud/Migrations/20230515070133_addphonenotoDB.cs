using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ReactAspCrud.Migrations
{
    /// <inheritdoc />
    public partial class addphonenotoDB : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "phoneno",
                table: "Student",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "phoneno",
                table: "Student");
        }
    }
}
