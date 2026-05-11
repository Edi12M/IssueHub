using System.ComponentModel.DataAnnotations;
using Backend.Enum;

namespace Backend.DTOs.IssueDependencies;

public class CreateIssueDependencyDto
{
    [Required]
    public int DependsOnId { get; set; }

    [Required]
    public IssueDependencyType Type { get; set; }
}