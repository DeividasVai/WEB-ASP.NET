using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Learn_Page.Models
{
    public class Person
    {
        public int ID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Age { get; set; }
        public string ClassType { get; set; }

        public Person(int id, string name, string lastName, string age, string classType)
        {
            ID = id;
            FirstName = name;
            LastName = lastName;
            Age = age;
            ClassType = classType;
        }

        public Person()
        {

        }
    }
}
