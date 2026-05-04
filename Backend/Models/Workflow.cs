namespace Backend.Models
{
    public class Workflow
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        //statuses
        //transitions  --> text?
        //automatic rules
        public int CreatedById { get; set; }
        public DateTime CreatedAt { get; set; }

        public User CreatedBy { get; set; }
    }
}
