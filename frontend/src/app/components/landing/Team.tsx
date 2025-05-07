import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import michael_photo from "./images/michael_photo.jpg";
import shani_photo from "./images/shani_photo.jpg";
import GitHub from "./social/GitHub";
import LinkedIn from "./social/Linkedin";

type Member = {
  name: string;
  role: string;
  image: StaticImageData;
  githubUrl?: string;
  linkedinUrl?: string;
};

const teamMembers: Member[] = [
  {
    name: "Michael Zheng",
    role: "Backend Developer",
    image: michael_photo,
    githubUrl: "https://github.com/michaelzheng02",
    linkedinUrl: "https://linkedin.com",
  },
  {
    name: "Shani Tuachi",
    role: "Frontend Developer",
    image: shani_photo,
    githubUrl: "https://github.com/shaninala",
    linkedinUrl: "https://www.linkedin.com/in/shani-tuachi/",
  },
];

export default function Team() {
  return (
    <section
      id="team"
      className="min-h-screen flex flex-col justify-center py-40 px-4 bg-[#FAF3E0]"
    >
      <span className="block text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[#3D405B] text-center mb-10">
        Meet our Team
      </span>
      <span className="block text-center text-xl sm:text-xl md:text-2xl text-[#3D405B] mb-16 max-w-7xl mx-auto">
        We're a group of motivated individuals, fueled by a shared passion for
        what we do.
      </span>
      <div className="flex flex-wrap justify-center gap-48">
        {teamMembers.map((member, index) => (
          <div key={index} className="text-center">
            <div className="mb-4">
              <Image
                src={member.image}
                alt={member.name}
                width={350}
                height={350}
                className="rounded-full mx-auto"
              />
            </div>
            <span className="block text-xl sm:text-2xl md:text-3xl font-bold text-[#3D405B] mb-1">
              {member.name}
            </span>
            <span className="block text-sm sm:text-md md:text-xl font-semibold text-[#3D405B] mb-3">
              {member.role}
            </span>
            <div className="flex items-center justify-center space-x-10 mt-2">
              {member.githubUrl && <GitHub url={member.githubUrl} />}
              {member.linkedinUrl && <LinkedIn url={member.linkedinUrl} />}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
