namespace Backend.Models
{
    public class Attachment
    {
        public int Id { get; set; }
        public int IssueId { get; set; }
        //UserId
        public int UploadedById { get; set; }
        public string FileName { get; set; }
        public string FileType { get; set; }
        public int FileSizeBytes { get; set; }
        public string StoragePath { get; set; }
        public DateTime UploadedAt { get; set; }

        //Navigation
        public Issue Issue { get; set; }
        public User UploadedBy { get; set; }
    }
}
