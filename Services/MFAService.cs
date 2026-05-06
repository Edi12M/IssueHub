namespace Backend.Services
{
    public class MFAService
    {
        public Task TriggerMFACheck(int userId)
            => throw new NotImplementedException();

        public Task<bool> VerifyOTP(int userId, string otp)
            => throw new NotImplementedException();
    }
}
