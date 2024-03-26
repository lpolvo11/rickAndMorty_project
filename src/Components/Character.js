const Character = ({ characters }) => {
  return (
    <div>
      {characters.map((character) => {
        return (
          <>
            <div className="container">
              <h1>.{character.name}</h1>
              <img src={character.image} alt={character.name} />
              <div className="infos">
                <p>*{character.status}</p>
                <p>*{character.gender}</p>
                <p>*{character.species}</p>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default Character;
