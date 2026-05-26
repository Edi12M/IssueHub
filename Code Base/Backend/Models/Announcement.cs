namespace Backend.Models
{
    public class Announcement
    {
        public int Id { get; set; }
        public int ProjectId { get; set; }
        //UserId
        public int AuthorId { get; set; }
        public string Body { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public string Comment { get; set; } = string.Empty;

        //Navigation
        public Project Project { get; set; } = null!;
        public User Author { get; set; } = null!;
    }
}
