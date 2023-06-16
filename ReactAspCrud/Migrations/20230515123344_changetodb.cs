using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ReactAspCrud.Migrations
{
    /// <inheritdoc />
    public partial class changetodb : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CityId",
                table: "Student",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "CountryId",
                table: "Student",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "StateId",
                table: "Student",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Country",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CountryName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Country", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "States",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StateName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CountryId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_States", x => x.Id);
                    table.ForeignKey(
                        name: "FK_States_Country_CountryId",
                        column: x => x.CountryId,
                        principalTable: "Country",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "City",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CityName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StateId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_City", x => x.Id);
                    table.ForeignKey(
                        name: "FK_City_States_StateId",
                        column: x => x.StateId,
                        principalTable: "States",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Student_CityId",
                table: "Student",
                column: "CityId");

            migrationBuilder.CreateIndex(
                name: "IX_Student_CountryId",
                table: "Student",
                column: "CountryId");

            migrationBuilder.CreateIndex(
                name: "IX_Student_StateId",
                table: "Student",
                column: "StateId");

            migrationBuilder.CreateIndex(
                name: "IX_City_StateId",
                table: "City",
                column: "StateId");

            migrationBuilder.CreateIndex(
                name: "IX_States_CountryId",
                table: "States",
                column: "CountryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Student_City_CityId",
                table: "Student",
                column: "CityId",
                principalTable: "City",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Student_Country_CountryId",
                table: "Student",
                column: "CountryId",
                principalTable: "Country",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Student_States_StateId",
                table: "Student",
                column: "StateId",
                principalTable: "States",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Student_City_CityId",
                table: "Student");

            migrationBuilder.DropForeignKey(
                name: "FK_Student_Country_CountryId",
                table: "Student");

            migrationBuilder.DropForeignKey(
                name: "FK_Student_States_StateId",
                table: "Student");

            migrationBuilder.DropTable(
                name: "City");

            migrationBuilder.DropTable(
                name: "States");

            migrationBuilder.DropTable(
                name: "Country");

            migrationBuilder.DropIndex(
                name: "IX_Student_CityId",
                table: "Student");

            migrationBuilder.DropIndex(
                name: "IX_Student_CountryId",
                table: "Student");

            migrationBuilder.DropIndex(
                name: "IX_Student_StateId",
                table: "Student");

            migrationBuilder.DropColumn(
                name: "CityId",
                table: "Student");

            migrationBuilder.DropColumn(
                name: "CountryId",
                table: "Student");

            migrationBuilder.DropColumn(
                name: "StateId",
                table: "Student");
        }
    }
}
