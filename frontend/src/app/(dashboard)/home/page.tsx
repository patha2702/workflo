import Image from "next/image";

interface IllustrationCard {
  image: {
    imageSrc: string;
    alt: string;
    width: number;
    height: number;
  };

  title: string;
  description: string;
}

const illustrationCards: IllustrationCard[] = [
  {
    image: {
      imageSrc: "/assets/images/tags-illustration.svg",
      alt: "Tags illustration",
      width: 77,
      height: 61,
    },
    title: "Introducing tags",
    description:
      "Easily categorize and find your notes by adding tags. Keep your workspace clutter-free and efficient.",
  },
  {
    image: {
      imageSrc: "/assets/images/sharing-illustration.svg",
      alt: "Sharing illustration",
      width: 76,
      height: 50,
    },
    title: "Share Notes Instantly",
    description:
      "Effortlessly share your notes with others via email or link. Enhance collaboration with quick sharing options.",
  },
  {
    image: {
      imageSrc: "/assets/images/access-illustration.svg",
      alt: "Access illustration",
      width: 76,
      height: 70,
    },
    title: "Access Anywhere",
    description:
      "Sync your notes across all devices. Stay productive whether you're on your phone, tablet, or computer.",
  },
];

const Home = () => {
  return (
    <div className="w-full border border-black">
      <div className="flex flex-col gap-3 py-2">
        <div className="flex justify-between items-center text-[#080808]">
          <span className="font-medium text-5xl ">Good morning, Joe!</span>
          <div className="flex justify-start items-center gap-2">
            <span className="font-normal text-base">Help & feedback</span>
            <Image
              src={"/assets/icons/question.svg"}
              alt="help"
              width={24}
              height={24}
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {illustrationCards.map((card) => {
            return (
              <div className="rounded-lg bg-white border border-[#f4f4f4] p-4 flex justify-center gap-2" key={card.title}>
                <Image
                  src={card.image.imageSrc}
                  alt={card.image.alt}
                  width={card.image.width}
                  height={card.image.height}
                />
                <div className="flex flex-col items-start justify-center">
                  <h2 className="font-semibold text-base text-[#757575]">{card.title}</h2>
                  <p className="text-sm font-normal text-[#868686]">{card.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <div className="bg-white rounded-lg border border-[#e9e9e9] p-2 flex justify-between items-center max-w-48">
          <input type="text" placeholder="Search" className="w-full bg-inherit focus:outline-none" />
          <Image src="/assets/icons/search.svg" width={24} height={24} alt="search" className="bg-white" />
        </div>
      </div>
    </div>
  );
};

export default Home;
