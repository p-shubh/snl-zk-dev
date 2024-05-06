import { removePrefix } from "../../modules/Utils/ipfsUtil";

function Card({ card, onClick }) {

    console.log("card", card)
  return (
    <div
      className={`memory-card${card.isFlipped ? " flip" : ""}`}
      onClick={onClick}
      style={{ order: card.order }}
      data-testid={card.id}
    >
      <img className="front-face" src={`${'https://nftstorage.link/ipfs'}/${removePrefix(
                card.card
              )}`} alt={`Image ${card.id}`} />
      <img className="back-face" src="/cardbackside.jpg" alt="Badge" />
    </div>
  );
}

export default Card;