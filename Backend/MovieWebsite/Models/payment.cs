namespace MovieWebsite.Models
{
    public class payment
    {
        public int P_ID { get; set; }
        public string P_CARDHOLDER_NAME { get; set; }
        public string P_CARD_NO { get; set; }
        public string P_CARD_TYPE { get; set; }
        public string P_EXPIRY { get; set; }
        public int P_CVV { get; set; }
        public int P_AMOUNT { get; set; }
    }
}
