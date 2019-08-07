﻿// <auto-generated />
using System;
using JumboCaramelPayroll;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace JumboCaramelPayroll.Migrations
{
    [DbContext(typeof(SiteContext))]
    [Migration("20190807151531_EmployeeAdminEdit")]
    partial class EmployeeAdminEdit
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.11-servicing-32099")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("JumboCaramelPayroll.Models.Employee", b =>
                {
                    b.Property<int>("EmployeeId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Address");

                    b.Property<bool>("Admin");

                    b.Property<DateTime>("Birthdate");

                    b.Property<string>("Email");

                    b.Property<string>("FirstName");

                    b.Property<string>("LastName");

                    b.Property<string>("PhoneNumber");

                    b.Property<int>("RoleId");

                    b.Property<string>("SSN");

                    b.HasKey("EmployeeId");

                    b.HasIndex("RoleId");

                    b.ToTable("Employees");

                    b.HasData(
                        new { EmployeeId = 1, Address = "123 Front street", Admin = true, Birthdate = new DateTime(2019, 8, 7, 0, 0, 0, 0, DateTimeKind.Local), Email = "Jon.Smith@gmail.com", FirstName = "Jon", LastName = "Smith", PhoneNumber = "216-867-5309", RoleId = 1, SSN = "200-300-5000" },
                        new { EmployeeId = 2, Address = "666 Mockingbird Lane", Admin = false, Birthdate = new DateTime(2019, 8, 7, 0, 0, 0, 0, DateTimeKind.Local), Email = "Joe.Carter@gmail.com", FirstName = "Joe", LastName = "Carter", PhoneNumber = "555-555-555", RoleId = 2, SSN = "200-310-5690" },
                        new { EmployeeId = 3, Address = "578 Elm Street", Admin = false, Birthdate = new DateTime(2019, 8, 7, 0, 0, 0, 0, DateTimeKind.Local), Email = "Fred.Johnson@yaho.com", FirstName = "Fred", LastName = "Johnson", PhoneNumber = "216-210-5310", RoleId = 2, SSN = "100-600-4000" },
                        new { EmployeeId = 4, Address = "3346 W. 4th", Admin = false, Birthdate = new DateTime(2019, 8, 7, 0, 0, 0, 0, DateTimeKind.Local), Email = "Jen.Morgan@hotmail.com", FirstName = "Jen", LastName = "Morgan", PhoneNumber = "440-551-5309", RoleId = 1, SSN = "001-003-5000" }
                    );
                });

            modelBuilder.Entity("JumboCaramelPayroll.Models.Hours", b =>
                {
                    b.Property<int>("HoursId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("Approved");

                    b.Property<int>("EmployeeId");

                    b.Property<DateTime>("TimeIn");

                    b.Property<DateTime>("TimeOut");

                    b.Property<decimal>("TotalHours");

                    b.HasKey("HoursId");

                    b.HasIndex("EmployeeId");

                    b.ToTable("Hours");

                    b.HasData(
                        new { HoursId = 1, Approved = false, EmployeeId = 1, TimeIn = new DateTime(1984, 12, 16, 12, 32, 54, 0, DateTimeKind.Unspecified), TimeOut = new DateTime(1984, 12, 16, 22, 32, 54, 0, DateTimeKind.Unspecified), TotalHours = 10m }
                    );
                });

            modelBuilder.Entity("JumboCaramelPayroll.Models.Role", b =>
                {
                    b.Property<int>("RoleId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("HourRate");

                    b.Property<decimal>("PayRate");

                    b.Property<string>("RoleName");

                    b.HasKey("RoleId");

                    b.ToTable("Roles");

                    b.HasData(
                        new { RoleId = 1, HourRate = 12, PayRate = 800m, RoleName = "Camera Operator" },
                        new { RoleId = 2, HourRate = 12, PayRate = 500m, RoleName = "First Assistant Camera" }
                    );
                });

            modelBuilder.Entity("JumboCaramelPayroll.Models.Employee", b =>
                {
                    b.HasOne("JumboCaramelPayroll.Models.Role")
                        .WithMany("Employees")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("JumboCaramelPayroll.Models.Hours", b =>
                {
                    b.HasOne("JumboCaramelPayroll.Models.Employee")
                        .WithMany("Hours")
                        .HasForeignKey("EmployeeId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
