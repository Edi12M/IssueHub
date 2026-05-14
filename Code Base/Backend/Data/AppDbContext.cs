using Backend.Models;
using Backend.Enum;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options) { }

    // ── DbSets ──────────────────────────────────────────────
    public DbSet<User>             Users             { get; set; }
    public DbSet<Project>          Projects          { get; set; }
    public DbSet<ProjectMembers>   ProjectMembers    { get; set; }
    public DbSet<Issue>            Issues            { get; set; }
    public DbSet<IssueAssignment>  IssueAssignments  { get; set; }
    public DbSet<IssueDependency>  IssueDependencies { get; set; }
    public DbSet<IssueHistory>     IssueHistories    { get; set; }
    public DbSet<Comment>          Comments          { get; set; }
    public DbSet<Attachment>       Attachments       { get; set; }
    public DbSet<TimeLog>          TimeLogs          { get; set; }
    public DbSet<Announcement>     Announcements     { get; set; }
    public DbSet<Meeting>          Meetings          { get; set; }
    public DbSet<Notification>     Notifications     { get; set; }

    // ── Relationships ────────────────────────────────────────
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // ── Column constraints ──────────────────────────────────
        // User
        modelBuilder.Entity<User>(b =>
        {
            b.Property(u => u.FullName).IsRequired().HasMaxLength(100);
            b.Property(u => u.Email).IsRequired().HasMaxLength(150);
            b.Property(u => u.PasswordHash).IsRequired().HasMaxLength(255);
            b.Property(u => u.Department).HasMaxLength(100);
            b.Property(u => u.Icon).HasMaxLength(255);
            b.HasIndex(u => u.Email).IsUnique();
        });

        // Project
        modelBuilder.Entity<Project>(b =>
        {
            b.Property(p => p.Name).IsRequired().HasMaxLength(150);
            b.Property(p => p.ProjectCode).IsRequired().HasMaxLength(50);
            b.Property(p => p.Description).IsRequired().HasMaxLength(2000);
            b.Property(p => p.Goals).HasMaxLength(2000);
            b.Property(p => p.Methodology).IsRequired().HasMaxLength(50);
        });

        // Issue
        modelBuilder.Entity<Issue>(b =>
        {
            b.Property(i => i.IssueCode).IsRequired().HasMaxLength(50);
            b.Property(i => i.Title).IsRequired().HasMaxLength(200);
            b.Property(i => i.Description).IsRequired().HasMaxLength(5000);
            b.Property(i => i.AcceptanceCriteria).HasMaxLength(5000);
        });

        // Comment
        modelBuilder.Entity<Comment>(b =>
        {
            b.Property(c => c.Body).IsRequired().HasMaxLength(5000);
        });

        // IssueHistory
        modelBuilder.Entity<IssueHistory>(b =>
        {
            b.Property(h => h.FieldName).IsRequired().HasMaxLength(100);
            b.Property(h => h.OldValue).HasMaxLength(500);
            b.Property(h => h.NewValue).HasMaxLength(500);
            b.Property(h => h.TransitionNote).HasMaxLength(500);
        });

        // Attachment
        modelBuilder.Entity<Attachment>(b =>
        {
            b.Property(a => a.FileName).IsRequired().HasMaxLength(255);
            b.Property(a => a.FileType).IsRequired().HasMaxLength(100);
            b.Property(a => a.StoragePath).IsRequired().HasMaxLength(500);
        });

        // Notification
        modelBuilder.Entity<Notification>(b =>
        {
            b.Property(n => n.EntityType).IsRequired().HasMaxLength(50);
        });

        // TimeLog
        modelBuilder.Entity<TimeLog>(b =>
        {
            b.Property(t => t.Note).HasMaxLength(1000);
        });

        // ── Relationships & indexes ─────────────────────────────

        // Project → Owner
        modelBuilder.Entity<Project>()
            .HasOne(p => p.Owner)
            .WithMany(u => u.OwnedProjects)
            .HasForeignKey(p => p.OwnerId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Project>()
            .HasIndex(p => p.ProjectCode)
            .IsUnique();

        modelBuilder.Entity<Project>()
            .Property(p => p.BudgetHours)
            .HasColumnType("decimal(10,2)");

        // ProjectMembers
        modelBuilder.Entity<ProjectMembers>()
            .HasOne(pm => pm.User)
            .WithMany(u => u.ProjectMembers)
            .HasForeignKey(pm => pm.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<ProjectMembers>()
            .HasOne(pm => pm.Project)
            .WithMany(p => p.ProjectMembers)
            .HasForeignKey(pm => pm.ProjectId)
            .OnDelete(DeleteBehavior.Cascade);

        // Issue → self-referencing (sub-issues)
        modelBuilder.Entity<Issue>()
            .HasOne(i => i.Parent)
            .WithMany(i => i.SubIssues)
            .HasForeignKey(i => i.ParentId)
            .IsRequired(false)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Issue>()
            .Property(i => i.ParentId)
            .IsRequired(false);

        // Issue → Reporter
        modelBuilder.Entity<Issue>()
            .HasOne(i => i.Reporter)
            .WithMany()
            .HasForeignKey(i => i.ReporterId)
            .OnDelete(DeleteBehavior.Restrict);

        // Issue → Project
        modelBuilder.Entity<Issue>()
            .HasOne(i => i.Project)
            .WithMany(p => p.Issues)
            .HasForeignKey(i => i.ProjectId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Issue>()
            .HasIndex(i => i.IssueCode)
            .IsUnique();

        // IssueAssignment
        modelBuilder.Entity<IssueAssignment>()
            .HasOne(a => a.Issue)
            .WithMany(i => i.Assignments)
            .HasForeignKey(a => a.IssueId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<IssueAssignment>()
            .HasOne(a => a.User)
            .WithMany(u => u.IssueAssignments)
            .HasForeignKey(a => a.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        // IssueDependency (two FKs → Issue)
        modelBuilder.Entity<IssueDependency>()
            .HasOne(d => d.Issue)
            .WithMany(i => i.Dependencies)
            .HasForeignKey(d => d.IssueId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<IssueDependency>()
            .HasOne(d => d.DependsOn)
            .WithMany()
            .HasForeignKey(d => d.DependOnId)
            .OnDelete(DeleteBehavior.Restrict);

        // Comment → self-referencing (replies)
        modelBuilder.Entity<Comment>()
            .HasOne(c => c.Parent)
            .WithMany(c => c.Replies)
            .HasForeignKey(c => c.ParentId)
            .IsRequired(false)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Comment>()
            .Property(c => c.ParentId)
            .IsRequired(false);

        // Comment → Issue
        modelBuilder.Entity<Comment>()
            .HasOne(c => c.Issue)
            .WithMany(i => i.Comments)
            .HasForeignKey(c => c.IssueId)
            .OnDelete(DeleteBehavior.Cascade);

        // Comment → Author
        modelBuilder.Entity<Comment>()
            .HasOne(c => c.Author)
            .WithMany(u => u.Comments)
            .HasForeignKey(c => c.AuthorId)
            .OnDelete(DeleteBehavior.Restrict);

        // IssueHistory → Issue
        modelBuilder.Entity<IssueHistory>()
            .HasOne(h => h.Issue)
            .WithMany(i => i.History)
            .HasForeignKey(h => h.IssueId)
            .OnDelete(DeleteBehavior.Cascade);

        // Announcement → Project
        modelBuilder.Entity<Announcement>()
            .HasOne(a => a.Project)
            .WithMany(p => p.Announcements)
            .HasForeignKey(a => a.ProjectId)
            .OnDelete(DeleteBehavior.Cascade);

        // Announcement → Author
        modelBuilder.Entity<Announcement>()
            .HasOne(a => a.Author)
            .WithMany(u => u.Announcements)
            .HasForeignKey(a => a.AuthorId)
            .OnDelete(DeleteBehavior.Restrict);

        // Meeting → Project
        modelBuilder.Entity<Meeting>()
            .HasOne(m => m.Project)
            .WithMany(p => p.Meetings)
            .HasForeignKey(m => m.ProjectId)
            .OnDelete(DeleteBehavior.Cascade);

        // Meeting → CreatedBy
        modelBuilder.Entity<Meeting>()
            .HasOne(m => m.CreatedBy)
            .WithMany(u => u.Meetings)
            .HasForeignKey(m => m.CreatedById)
            .OnDelete(DeleteBehavior.Restrict);

        // Attachment → Issue
        modelBuilder.Entity<Attachment>()
            .HasOne(a => a.Issue)
            .WithMany(i => i.Attachments)
            .HasForeignKey(a => a.IssueId)
            .OnDelete(DeleteBehavior.Cascade);

        // Attachment → UploadedBy
        modelBuilder.Entity<Attachment>()
            .HasOne(a => a.UploadedBy)
            .WithMany(u => u.Attachments)
            .HasForeignKey(a => a.UploadedById)
            .OnDelete(DeleteBehavior.Restrict);

        // TimeLog → Issue
        modelBuilder.Entity<TimeLog>()
            .HasOne(t => t.Issue)
            .WithMany(i => i.TimeLogs)
            .HasForeignKey(t => t.IssueId)
            .OnDelete(DeleteBehavior.Cascade);

        // TimeLog → User
        modelBuilder.Entity<TimeLog>()
            .HasOne(t => t.User)
            .WithMany(u => u.TimeLogs)
            .HasForeignKey(t => t.UserId)
            .OnDelete(DeleteBehavior.Restrict);

        // Notification → User
        modelBuilder.Entity<Notification>()
            .HasOne(n => n.User)
            .WithMany(u => u.Notifications)
            .HasForeignKey(n => n.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        // TimeLog precision
        modelBuilder.Entity<TimeLog>()
            .Property(t => t.Hours)
            .HasColumnType("decimal(8,2)");

        // ProjectMembers HourlyRate precision
        modelBuilder.Entity<ProjectMembers>()
            .Property(pm => pm.HourlyRate)
            .HasColumnType("decimal(10,2)");
    }
}
