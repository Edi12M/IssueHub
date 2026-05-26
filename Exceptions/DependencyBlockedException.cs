namespace Backend.Exceptions
{
    public class BlockerInfo
    {
        public int Id { get; set; }
        public string IssueCode { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
    }

    public class DependencyBlockedException : Exception
    {
        public IReadOnlyList<BlockerInfo> Blockers { get; }

        public DependencyBlockedException(string message, IReadOnlyList<BlockerInfo> blockers)
            : base(message)
        {
            Blockers = blockers;
        }
    }
}
