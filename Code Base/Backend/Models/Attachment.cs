namespace Backend.Models
{
    public class Attachment
    {
        public int Id { get; set; }
        public int IssueId { get; set; }
        //UserId
        public int UploadedById { get; set; }
        public string FileName { get; set; } = string.Empty;
        public string FileType { get; set; } = string.Empty;
        public int FileSizeBytes { get; set; }
        public string StoragePath { get; set; } = string.Empty;
        public DateTime UploadedAt { get; set; }

        //Navigation
        public Issue Issue { get; set; } = null!;
        public User UploadedBy { get; set; } = null!;
    }
}
