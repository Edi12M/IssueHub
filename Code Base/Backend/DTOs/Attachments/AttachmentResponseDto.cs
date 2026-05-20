namespace Backend.DTOs.Attachments
{
    public class AttachmentResponseDto
    {
        public int Id { get; set; }
        public int IssueId { get; set; }
        public int UploadedById { get; set; }
        public string UploadedByName { get; set; } = string.Empty;
        public string FileName { get; set; } = string.Empty;
        public string FileType { get; set; } = string.Empty;
        public int FileSizeBytes { get; set; }
        public DateTime UploadedAt { get; set; }
    }
}
