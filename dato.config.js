module.exports = (dato, root, i18n) => {
  root.directory("src/pages", (pagesDir) => {
    dato.pages.forEach((page) => {
      pagesDir.createPost(`${page.slug}.md`, "yaml", {
        frontmatter: {
          title: page.title,
          subtitle: page.subtitle,
          position: page.position,
          background_image: page.backgroundImage.url({ auto: "compress" }),
          layout: "../layouts/page.astro",
        },
        content: page.body.trim() + "\n",
      });
    });
  });

  const WEEKDAYS = {
    monday: "Maanantai",
    tuesday: "Tiistai",
    wednesday: "Keskiviikko",
    thursday: "Torstai",
    friday: "Perjantai",
    saturday: "Lauantai",
    sunday: "Sunnuntai",
  };

  root.directory("src/content/timetables", (timetablesDir) => {
    const data = {
      heading: dato.timetable.heading,
      timetable: Object.entries(WEEKDAYS).map(([key, translation]) => {
        // console.log(key, translation, dato.timetable.attributes[key]);
        const timeslots = dato.timetable.attributes[key].map((timeslot) => {
          return `${timeslot.time} ${timeslot.sport}, ${timeslot.location}`;
        });

        return {
          day: translation,
          times: timeslots,
        };
      }),
    };

    timetablesDir.createDataFile("current.json", "json", data);
  });
};
