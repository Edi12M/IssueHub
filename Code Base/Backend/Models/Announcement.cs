namespace Backend.Models
{
    public class Announcement
    {
        public int Id { get; set; }
        public int ProjectId { get; set; }
        //UserId
        public int AuthorId { get; set; }
        public string Body { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Comment { get; set; }
    }
}
