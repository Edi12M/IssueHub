using Backend.Enum;

namespace Backend.Models
{
    public class Meeting
    {
        public int Id { get; set; }
        public int ProjectId { get; set; }
        //UserId
        public int CreatedById { get; set; }
        public string Title { get; set; }
        public string AudioPath { get; set; }
        public string Transcript { get; set; }
        public string Summary { get; set; }
        public MeetingStatus Status { get; set; }
        public DateTime RecordedAt { get; set; }
        public DateTime CreatedAt { get; set; }

        public Project Project { get; set; }
        public User CreatedBy { get; set; }

    }
}
