using Backend.Enum;

namespace Backend.Models
{
    public class Meeting
    {
        public int Id { get; set; }
        public int ProjectId { get; set; }
        //UserId
        public int CreatedById { get; set; }
        public string Title { get; set; } = string.Empty;
        public string AudioPath { get; set; } = string.Empty;
        public string Transcript { get; set; } = string.Empty;
        public string Summary { get; set; } = string.Empty;
        public MeetingStatus Status { get; set; }
        public DateTime RecordedAt { get; set; }
        public DateTime CreatedAt { get; set; }

        //Navigation
        public Project Project { get; set; } = null!;
        public User CreatedBy { get; set; } = null!;

    }
}
