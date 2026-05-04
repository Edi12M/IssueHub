namespace Backend.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public int IssueId { get; set; }
        //UserId
        public int AuthorId { get; set; }
        //comment id?
        public int ParentId { get; set; }
        public string Body { get; set; }
        public bool IsEdited { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        //Navigation
        public Issue Issue { get; set; }
        public User Author { get; set; }
        public Comment Parent { get; set; }                        // self-referencing (replies)
        public ICollection<Comment> Replies { get; set; }         // self-referencing
    }
}
