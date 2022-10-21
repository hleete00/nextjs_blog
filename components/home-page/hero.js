import Image from "next/image";
import classes from "./hero.module.css";

function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/site/HunterLeete.png"
          alt="Alt image showing Hunter"
          width={300}
          height={300}
        />
      </div>
      <h1>Hi, Im Hunter</h1>
      <p>I blog about coding, hunting, MMA, fitness, and life in general.</p>
    </section>
  );
}

export default Hero;
