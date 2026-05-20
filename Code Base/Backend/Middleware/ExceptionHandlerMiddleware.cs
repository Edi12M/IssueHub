using System.Text.Json;
using Backend.Exceptions;

namespace Backend.Middleware
{
    public class ExceptionHandlerMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionHandlerMiddleware> _logger;

        public ExceptionHandlerMiddleware(RequestDelegate next, ILogger<ExceptionHandlerMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception ex)
        {
            int statusCode;
            object payload;

            switch (ex)
            {
                case DependencyBlockedException dep:
                    statusCode = StatusCodes.Status409Conflict;
                    payload = new { error = dep.Message, blockers = dep.Blockers };
                    break;

                case NotFoundException:
                case KeyNotFoundException:
                    statusCode = StatusCodes.Status404NotFound;
                    payload = new { error = ex.Message };
                    break;

                case ConflictException:
                case InvalidOperationException:
                    statusCode = StatusCodes.Status409Conflict;
                    payload = new { error = ex.Message };
                    break;

                case BadRequestException:
                    statusCode = StatusCodes.Status400BadRequest;
                    payload = new { error = ex.Message };
                    break;

                case ForbiddenException:
                    statusCode = StatusCodes.Status403Forbidden;
                    payload = new { error = ex.Message };
                    break;

                default:
                    statusCode = StatusCodes.Status500InternalServerError;
                    payload = new { error = "An unexpected error occurred." };
                    break;
            }

            if (statusCode == StatusCodes.Status500InternalServerError)
                _logger.LogError(ex, "Unhandled exception");
            else
                _logger.LogWarning(ex, "Handled exception: {Message}", ex.Message);

            context.Response.ContentType = "application/json";
            context.Response.StatusCode = statusCode;
            await context.Response.WriteAsync(JsonSerializer.Serialize(payload));
        }
    }
}
