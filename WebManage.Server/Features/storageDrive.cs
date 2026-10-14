namespace WebManage.Server.Features
{
    public class storageDrive
    {
        public string name { get; set; }
        public string total { get; set; }
        public string free { get; set; }

        public storageDrive(string name, int total, int free)
        {
            this.name = name;
            this.total = total.ToString() + " GB";
            this.free = free.ToString() + " GB";
        }
    }
}
