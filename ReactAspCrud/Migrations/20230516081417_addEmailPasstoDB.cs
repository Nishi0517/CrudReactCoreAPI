using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ReactAspCrud.Migrations
{
    /// <inheritdoc />
    public partial class addEmailPasstoDB : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
         
            migrationBuilder.AddColumn<string>(
                name: "email",
                table: "Student",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "password",
                table: "Student",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "email",
                table: "Student");

            migrationBuilder.DropColumn(
                name: "password",
                table: "Student");

            
        }
    }
}
