directory "src/pages" do
  dato.pages.each do |page|
    create_post "#{page.slug}.md" do
      attributes = {
        title: page.title,
        subtitle: page.subtitle,
        position: page.position,
        background_image: page.background_image.url(auto: :compress),
        layout: "../layouts/page.astro"
      }

      attributes.reject! do |_, value|
        value.nil? || value.respond_to?(:empty?) && value.empty?
      end

      frontmatter(:yaml, attributes)
      content(page.body.strip + "\n")
    end
  end
end

WEEKDAYS = {
  monday: "Maanantai",
  tuesday: "Tiistai",
  wednesday: "Keskiviikko",
  thursday: "Torstai",
  friday: "Perjantai",
  saturday: "Lauantai",
  sunday: "Sunnuntai"
}

directory "src/content/timetables" do
  data = {
    heading: dato.timetable.heading,
    timetable: WEEKDAYS.map do |key, translation|
      timeslots = dato.timetable.attributes[key].map do |timeslot|
        "#{timeslot.time} #{timeslot.sport}, #{timeslot.location}"
      end

      {
        day: translation,
        times: timeslots
      }
    end
  }

  create_data_file("current.json", :json, data)
end
