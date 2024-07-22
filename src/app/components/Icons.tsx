'use client';

interface IconsProps {
  name: IconPathTypes;
}

function Icons({ name, className, hoverFill, onClick }: IconsProps) {
  const { width, height, fill, path, options } = name;
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      onClick={onClick}
      fill={hoverFill || fill}
      className={className}
    >
      <path d={path} {...options} />
    </svg>
  );
}

export default Icons;
