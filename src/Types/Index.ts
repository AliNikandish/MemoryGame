type cardItemsType = itemsType[];

interface itemsType {
  src: string;
  matched: boolean;
  id?: string;
}

type ItemsProps = {
  item: {
    src: string;
    matched: boolean;
    id?: string;
  };
  handleChoice: (card: any) => void;
  disabled: boolean;
  flipped: boolean;
};
