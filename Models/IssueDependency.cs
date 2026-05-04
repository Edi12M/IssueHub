using Backend.Enum;

namespace Backend.Models
{
    public class IssueDependency
    {
        public int Id { get; set; }
        public int IssueId { get; set; }
        //IssueId
        public int DependOnId { get; set; }
        public IssueDependencyType Type { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
