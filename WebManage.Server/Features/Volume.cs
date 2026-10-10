namespace WebManage.Server.Features
{
    public class Volume
    {
        public string name { get; set; }
        public int id { get; set; }

        public Volume(int Id, string Name)
        {
            this.id = Id;
            this.name = Name;
        }
    }
}
