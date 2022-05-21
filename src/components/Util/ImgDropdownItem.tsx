type Props = {
  title: string;
  link: string;
};

export default function ImgDropdownItem({ title, link }: Props) {
  return (
    <div className="w-2rem h-2rem flex align-items-center">
      {/* Safeguard for "no image" option to not attempt loading an image */}
      {link && (
        <img
          className="h-full mr-2 w-full h-full"
          style={{
            objectFit: "contain",
          }}
          src={`https://oqzsfqonlctjkurrmwkj.supabase.co/storage/v1/object/public/images/${link}`}
          alt={title}
          loading="lazy"
        />
      )}
      <span>{title}</span>
    </div>
  );
}
