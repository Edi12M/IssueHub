using Backend.Enum;

namespace Backend.Models
{
    public class Notification
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public NotificationType Type { get; set; }
        public string EntityType { get; set; }
        public int EntityId { get; set; }
        public bool IsRead { get; set; }
        public DateTime CreatedAt { get; set; }

        //Navigation
        public User User { get; set; }
    }
}
