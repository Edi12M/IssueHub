using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class SeedInitialTestUsers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedAt", "Department", "Email", "FailedLoginAttempts", "FullName", "Icon", "LastLoginAt", "LockedUntil", "PasswordHash", "Role", "Status" },
                values: new object[,]
                {
                    { 1, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "IT", "admin@issuehub.com", 0, "System Admin", null, null, null, "$2a$11$s0WcEmNJBpZPDF6XRSY3yOeCilMqsvfg6Vttw6/saGouY92.oac62", 0, 0 },
                    { 2, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Management", "pm@issuehub.com", 0, "Project Manager", null, null, null, "$2a$11$s0WcEmNJBpZPDF6XRSY3yOeCilMqsvfg6Vttw6/saGouY92.oac62", 1, 0 },
                    { 3, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Engineering", "dev1@issuehub.com", 0, "Developer One", null, null, null, "$2a$11$s0WcEmNJBpZPDF6XRSY3yOeCilMqsvfg6Vttw6/saGouY92.oac62", 2, 0 },
                    { 4, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Engineering", "dev2@issuehub.com", 0, "Developer Two", null, null, null, "$2a$11$s0WcEmNJBpZPDF6XRSY3yOeCilMqsvfg6Vttw6/saGouY92.oac62", 2, 0 },
                    { 5, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Engineering", "dev3@issuehub.com", 0, "Developer Three", null, null, null, "$2a$11$s0WcEmNJBpZPDF6XRSY3yOeCilMqsvfg6Vttw6/saGouY92.oac62", 2, 0 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 5);
        }
    }
}
