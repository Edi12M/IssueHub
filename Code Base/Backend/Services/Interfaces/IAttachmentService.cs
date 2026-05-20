using Backend.DTOs.Attachments;

namespace Backend.Services.Interfaces
{
    public class AttachmentDownload
    {
        public string FilePath { get; set; } = string.Empty;
        public string FileName { get; set; } = string.Empty;
        public string FileType { get; set; } = string.Empty;
    }

    public interface IAttachmentService
    {
        Task<AttachmentResponseDto> CreateAttachmentAsync(
            int issueId,
            int uploaderId,
            string fileName,
            string contentType,
            long size,
            Stream content);

        Task<AttachmentResponseDto> GetAttachmentAsync(int attachmentId);

        Task<AttachmentDownload> GetAttachmentDownloadAsync(int attachmentId);

        Task<List<AttachmentResponseDto>> GetAttachmentsForIssueAsync(int issueId);

        Task DeleteAttachmentAsync(int attachmentId, int actorId);
    }
}
