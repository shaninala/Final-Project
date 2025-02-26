import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import michael_photo from "./images/michael_photo.jpg";
import shani_photo from "./images/shani_photo.jpg";

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
    linkedinUrl: "https://linkedin.com",
  },
];

export default function Team() {
  return (
    <section>
      <span>Meet our Team</span>
      <span>
        We're a group of motivated individuals, fueled by a shared passion for
        what we do.
      </span>
      <div>
        {teamMembers.map((member, index) => (
          <div key={index}>
            <div>
              <Image
                src={member.image}
                alt={member.name}
                width={350}
                height={350}
              />
            </div>
            <span>{member.role}</span>
            <div>
              {member.githubUrl}
              {member.linkedinUrl}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
