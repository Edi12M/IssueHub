using Backend.Models;

namespace Backend.Services
{
    public class AttachmentService
    {
        public Task<Attachment> UploadFile(IFormFile file, int issueId, int uploadedById)
            => throw new NotImplementedException();

        public Task<string> StoreFile(IFormFile file)
            => throw new NotImplementedException();

        public Task StoreFileMetadata(string fileName, string fileType, int sizeBytes, string storagePath)
            => throw new NotImplementedException();

        public Task LinkAttachmentToIssue(int attachmentId, int issueId)
            => throw new NotImplementedException();

        public Task<List<Attachment>> GetAttachmentsForIssue(int issueId)
            => throw new NotImplementedException();

        public Task LogAttachmentUpload(int attachmentId, int userId)
            => throw new NotImplementedException();
    }
}
