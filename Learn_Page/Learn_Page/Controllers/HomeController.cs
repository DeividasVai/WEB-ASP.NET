using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Learn_Page.Models;
using Microsoft.Extensions.Caching.Memory;

namespace Learn_Page.Controllers
{
    public class HomeController : Controller
    {
        private IMemoryCache _cache;

        public HomeController(IMemoryCache memoryCache)
        {
            _cache = memoryCache;
        }

        [HttpPost]
        public IActionResult AddEntry(Person person)
        {
            List<Person> cacheEntry;
            if (!_cache.TryGetValue("TableSave", out cacheEntry))
            {
                cacheEntry = new List<Person>();
                cacheEntry.Add(person);
            }
            else
            {
                int id = 0;
                foreach (Person per in cacheEntry)
                {
                    if (per.ID > id)
                        id = per.ID;
                }

                person.ID = id+1;
                cacheEntry.Add(person);
            }

            // Set cache options.
            var cacheEntryOptions = new MemoryCacheEntryOptions()
                // Keep in cache for this time, reset time if accessed.
                .SetSlidingExpiration(TimeSpan.FromSeconds(6000));
            _cache.Set("TableSave", cacheEntry, cacheEntryOptions);

            return Json(new { sucess = true, id = person.ID});
        }

        public IActionResult Index()
        {
            List<Person> cacheEntry;

            // Look for cache key.
            if (!_cache.TryGetValue("TableSave", out cacheEntry))
            {
                cacheEntry = new List<Person>();
                // Key not in cache, so get data.
                cacheEntry.Add(new Person(1, "Tom", "Phillips", "21", "active"));
                cacheEntry.Add(new Person(2, "Jeff", "Rodgers", "25", "active"));

                // Set cache options.
                var cacheEntryOptions = new MemoryCacheEntryOptions()
                    // Keep in cache for this time, reset time if accessed.
                    .SetSlidingExpiration(TimeSpan.FromSeconds(6000));

                // Save data in cache.
                _cache.Set("TableSave", cacheEntry, cacheEntryOptions);
            }

            return View(cacheEntry);
        }

        public IActionResult About()
        {
            ViewData["Message"] = "Your application description page.";

            return View();
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Contact page - Deividas";

            return View();
        }

        public IActionResult LogIn()
        {
            ViewData["Message"] = "Log in";

            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
