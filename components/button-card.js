import Link from "next/link";
export default function ButtonCard(props) {
  const { number, title, link, description } = props;

  return (
    <div>
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <Link href={`/buttons/${link}`}>
        <a>
          <button>Go to {number}</button>
        </a>
      </Link>
    </div>
  );
}
