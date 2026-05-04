using Backend.Enum;

namespace Backend.Models
{
    public class ProjectMembers
    {
        public int Id { get; set; }
        public int ProjectId { get; set; }
        public int UserId { get; set; }
        public ProjectMemberRole Role { get; set; }
        public DateTime JoinedAt { get; set; }

    }
}
