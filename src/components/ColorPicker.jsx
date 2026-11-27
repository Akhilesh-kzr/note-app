function ColorPicker({ color, setColor }) {

  const colors = [
    {
      name: "yellow",
      className: "bg-yellow-200"
    },
    {
      name: "blue",
      className: "bg-blue-200"
    },
    {
      name: "green",
      className: "bg-green-200"
    },
    {
      name: "pink",
      className: "bg-pink-200"
    },
    {
      name: "purple",
      className: "bg-purple-200"
    }
  ];

  return (
    <div className="flex gap-2">

      {colors.map(function (item) {

        return (
          <button
            key={item.name}
            type="button"
            onClick={function () {
              setColor(item.name);
            }}
            className={`w-7 h-7 rounded-full border-2 ${item.className} ${
              color === item.name
                ? "border-black"
                : "border-transparent"
            }`}
          >
          </button>
        );

      })}

    </div>
  );
}

export default ColorPicker;