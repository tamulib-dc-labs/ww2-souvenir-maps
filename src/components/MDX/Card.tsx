import { useEffect, useState } from "react";

import Card from "@components/Card/Card";
import { MDXCardStyled } from "@components/MDX/Card.styled.ts";
import { canopyManifests } from "@lib/constants/canopy";

interface MDXCardProps {
  iiifContent?: string;
  label?: string; // Optional label prop
}

const MDXCard = ({ iiifContent, label }: MDXCardProps) => {
  const [resource, setResource] = useState<any>();
  const manifests = canopyManifests();

  useEffect(() => {
    if (!iiifContent) return;

    const item = manifests.find((manifest) => manifest.id === iiifContent);
    if (item)
      setResource({
        id: iiifContent,
        type: "Manifest",
        label: label || item.label,
        thumbnail: item.thumbnail,
        homepage: [
          {
            id: `/works/${item.slug}`,
            label: item.label,
            type: "Text",
          },
        ],
      });
  }, [iiifContent, label, manifests]);

  if (!resource) return null;

  return (
    <MDXCardStyled data-testid="mdx-card">
      <Card resource={resource} />
    </MDXCardStyled>
  );
};

export default MDXCard;
