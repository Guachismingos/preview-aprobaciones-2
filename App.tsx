import {
  GluestackUIProvider,
  Text,
  Box,
  StatusBar,
  Card,
  Heading,
  Badge,
  BadgeText,
  FlatList,
  Actionsheet,
  SafeAreaView,
  Pressable,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicatorWrapper,
  ActionsheetDragIndicator,
  ActionsheetItem,
  ActionsheetItemText,
  ActionsheetScrollView,
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config"; // Optional if you want to use default theme
import { ListRenderItemInfo, TouchableOpacity } from "react-native";
import { useState } from "react";

interface Priority {
  id: number;
  title: string;
  value: number;
  color: "error" | "warning" | "info" | "success" | "muted" | undefined;
}

interface Area {
  id: number;
  title: string;
}

interface Item {
  id: string;
  priority: Priority;
  title: string;
  content: string;
  createdAt: string;
  area: Area;
}

const severityColors = {
  Urgente: "error", // Urgente -> error
  Alta: "warning", // Alta -> warning
  Media: "info", // Media -> info
  Baja: "success", // Baja -> success
  "Muy Baja": "muted", // Muy Baja -> muted
};

const data = [
  {
    id: "6657a172214bf99e74cc1cab",
    priority: {
      id: 1,
      title: "Urgente",
      value: 1,
      color: severityColors["Urgente"],
    },
    title: "eu mollit voluptate",
    content:
      "Sit sint velit enim magna ullamco non est laboris deserunt nisi incididunt.",
    createdAt: "2024-05-12T19:12:24.106Z",
    area: {
      id: 1,
      title: "Gastos",
    },
  },
  {
    id: "6657a1726b12774ab9f8dfaa",
    priority: {
      id: 4,
      title: "Baja",
      value: 4,
      color: severityColors["Baja"],
    },
    title: "aute irure aliquip",
    content: "Ut magna cillum aute irure cupidatat sit nisi tempor.",
    createdAt: "2024-05-01T07:50:31.783Z",
    area: {
      id: 3,
      title: "Ventas",
    },
  },
  {
    id: "6657a17200b17434c79f9fc2",
    priority: {
      id: 2,
      title: "Alta",
      value: 2,
      color: severityColors["Alta"],
    },
    title: "Lorem adipisicing elit",
    content: "Excepteur eiusmod nostrud culpa sunt.",
    createdAt: "2024-05-14T16:23:16.574Z",
    area: {
      id: 2,
      title: "Inventario",
    },
  },
  {
    id: "6657a172a578224e27a1534d",
    priority: {
      id: 4,
      title: "Baja",
      value: 4,
      color: severityColors["Baja"],
    },
    title: "consectetur exercitation mollit",
    content:
      "Consectetur ullamco est amet qui deserunt commodo ea occaecat exercitation dolore cillum veniam ut sit.",
    createdAt: "2024-01-03T03:15:32.678Z",
    area: {
      id: 3,
      title: "Ventas",
    },
  },
  {
    id: "6657a17257b6516b664745e5",
    priority: {
      id: 3,
      title: "Media",
      value: 3,
      color: severityColors["Media"],
    },
    title: "veniam sit cupidatat",
    content:
      "Minim veniam fugiat esse ullamco irure aliquip qui exercitation ea.",
    createdAt: "2024-01-10T00:45:26.557Z",
    area: {
      id: 2,
      title: "Inventario",
    },
  },
  {
    id: "6657a1721bc608196d2a39f7",
    priority: {
      id: 2,
      title: "Alta",
      value: 2,
      color: severityColors["Alta"],
    },
    title: "non non do",
    content: "Nostrud fugiat proident nostrud aute.",
    createdAt: "2024-03-07T23:25:06.696Z",
    area: {
      id: 1,
      title: "Gastos",
    },
  },
  {
    id: "6657a17231fb5e991a89bfef",
    priority: {
      id: 1,
      title: "Urgente",
      value: 1,
      color: severityColors["Urgente"],
    },
    title: "aliquip enim occaecat",
    content:
      "Eiusmod occaecat veniam eu ea eiusmod tempor elit reprehenderit non ullamco et aliquip.",
    createdAt: "2024-03-05T16:19:50.373Z",
    area: {
      id: 4,
      title: "RH",
    },
  },
  {
    id: "6657a17284b0287a06020fd9",
    priority: {
      id: 3,
      title: "Media",
      value: 3,
      color: severityColors["Media"],
    },
    title: "voluptate qui exercitation",
    content:
      "Veniam eu cillum eu sint ad culpa sint laboris proident id minim.",
    createdAt: "2024-02-20T06:53:29.569Z",
    area: {
      id: 2,
      title: "Inventario",
    },
  },
  {
    id: "6657a17228047724822bd230",
    priority: {
      id: 1,
      title: "Urgente",
      value: 1,
      color: severityColors["Urgente"],
    },
    title: "amet ullamco reprehenderit",
    content: "Dolore labore ea occaecat sint quis.",
    createdAt: "2024-04-10T02:50:21.534Z",
    area: {
      id: 2,
      title: "Inventario",
    },
  },
  {
    id: "6657a17221a9fb5a878ca602",
    priority: {
      id: 2,
      title: "Alta",
      value: 2,
      color: severityColors["Alta"],
    },
    title: "mollit in deserunt",
    content: "Et nisi reprehenderit mollit dolor anim sunt commodo cillum.",
    createdAt: "2024-05-26T04:58:20.055Z",
    area: {
      id: 3,
      title: "Ventas",
    },
  },
  {
    id: "6657a17202d72f763ca43b50",
    priority: {
      id: 5,
      title: "Muy Baja",
      value: 5,
      color: severityColors["Muy Baja"],
    },
    title: "est cupidatat pariatur",
    content: "Non cillum magna proident consequat ad cupidatat ullamco.",
    createdAt: "2024-02-02T23:58:54.555Z",
    area: {
      id: 1,
      title: "Gastos",
    },
  },
  {
    id: "6657a1723c70cdc44bda9ccf",
    priority: {
      id: 3,
      title: "Media",
      value: 3,
      color: severityColors["Media"],
    },
    title: "fugiat mollit eu",
    content:
      "Nulla minim amet sint voluptate officia proident ipsum est non quis sunt velit.",
    createdAt: "2024-04-20T22:10:57.734Z",
    area: {
      id: 3,
      title: "Ventas",
    },
  },
  {
    id: "6657a172f503a272ed7f1c05",
    priority: {
      id: 3,
      title: "Media",
      value: 3,
      color: severityColors["Media"],
    },
    title: "velit fugiat in",
    content:
      "Ex quis incididunt voluptate sit aute reprehenderit non consequat et.",
    createdAt: "2024-04-09T17:41:17.332Z",
    area: {
      id: 3,
      title: "Ventas",
    },
  },
  {
    id: "6657a1720506a28c0afee526",
    priority: {
      id: 1,
      title: "Urgente",
      value: 1,
      color: severityColors["Urgente"],
    },
    title: "eiusmod amet duis",
    content: "Ut velit sunt sunt ipsum.",
    createdAt: "2024-04-30T10:40:35.657Z",
    area: {
      id: 2,
      title: "Inventario",
    },
  },
  {
    id: "6657a17250b774b5a43a137e",
    priority: {
      id: 5,
      title: "Muy Baja",
      value: 5,
      color: severityColors["Muy Baja"],
    },
    title: "duis aliquip voluptate",
    content:
      "Eiusmod magna do magna consectetur consequat ipsum aliquip commodo commodo eu laboris sit.",
    createdAt: "2024-01-10T03:49:58.352Z",
    area: {
      id: 1,
      title: "Gastos",
    },
  },
  {
    id: "6657a1722b5ba73787fd37d7",
    priority: {
      id: 2,
      title: "Alta",
      value: 2,
      color: severityColors["Alta"],
    },
    title: "irure id ut",
    content:
      "Enim do dolore non laborum ipsum duis sit reprehenderit mollit veniam enim nulla.",
    createdAt: "2024-05-05T23:43:03.539Z",
    area: {
      id: 2,
      title: "Inventario",
    },
  },
  {
    id: "6657a172550f2a06fa9c5866",
    priority: {
      id: 5,
      title: "Muy Baja",
      value: 5,
      color: severityColors["Muy Baja"],
    },
    title: "laboris elit ad",
    content:
      "Pariatur qui esse amet laboris Lorem enim et ipsum pariatur cillum tempor veniam.",
    createdAt: "2024-03-21T17:47:25.312Z",
    area: {
      id: 2,
      title: "Inventario",
    },
  },
  {
    id: "6657a172bbe828d48ec7fe16",
    priority: {
      id: 4,
      title: "Baja",
      value: 4,
      color: severityColors["Baja"],
    },
    title: "ullamco et elit",
    content:
      "Pariatur quis dolor magna fugiat magna dolore Lorem ipsum culpa deserunt consectetur cillum cupidatat.",
    createdAt: "2024-03-19T10:06:03.723Z",
    area: {
      id: 4,
      title: "RH",
    },
  },
  {
    id: "6657a1720df837ec1c7b1426",
    priority: {
      id: 4,
      title: "Baja",
      value: 4,
      color: severityColors["Baja"],
    },
    title: "deserunt velit officia",
    content: "Dolore cillum qui nulla id Lorem cupidatat consectetur id.",
    createdAt: "2024-04-14T02:49:55.503Z",
    area: {
      id: 1,
      title: "Gastos",
    },
  },
  {
    id: "6657a1725f9ef513c5dae48e",
    priority: {
      id: 2,
      title: "Alta",
      value: 2,
      color: severityColors["Alta"],
    },
    title: "laboris fugiat enim",
    content: "Esse duis tempor eiusmod quis.",
    createdAt: "2024-04-27T11:59:33.737Z",
    area: {
      id: 1,
      title: "Gastos",
    },
  },
];

export default function App() {
  const [actualItem, setActualItem] = useState<null | Item>(null);

  return (
    <GluestackUIProvider config={config} colorMode="light">
      <StatusBar />
      <SafeAreaView height={"100%"}>
        <Heading size="xl" margin="$2" fontWeight="$normal">
          Solicitudes
        </Heading>
        <Box bgColor="$backgroundLight100" flex={1} padding="$2">
          <FlatList
            data={data}
            renderItem={({ item, index }: ListRenderItemInfo<any | Item>) => (
              <TouchableOpacity onPress={() => setActualItem(item)}>
                <Card elevation="$2" marginBottom="$2" key={index} gap={10}>
                  <Box flexDirection="row" justifyContent="space-between">
                    <Heading size="md" textTransform="capitalize">
                      {item.title}
                    </Heading>
                    <Badge
                      variant="outline"
                      action={(item as Item).priority.color}
                      borderRadius="$full"
                    >
                      <BadgeText>{item.priority.title}</BadgeText>
                    </Badge>
                  </Box>
                  <Text>{(item as Item).area.title}</Text>
                  <Text size="sm" style={{ textAlign: "right" }}>
                    {new Date(item.createdAt).toLocaleDateString()}
                    {" - "}
                    {new Date(item.createdAt).toLocaleTimeString()}
                  </Text>
                </Card>
              </TouchableOpacity>
            )}
          />
        </Box>
      </SafeAreaView>
      <Actionsheet
        isOpen={!!actualItem}
        zIndex={999}
        onClose={() => setActualItem(null)}
      >
        <ActionsheetBackdrop />
        <ActionsheetContent minHeight="88%" zIndex={999}>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <ActionsheetScrollView>
            <Box flexDirection="column" padding="$2" gap="$1">
              <Heading size="xl" textTransform="capitalize">
                {actualItem?.title}
              </Heading>
              <Heading
                size="lg"
                textTransform="capitalize"
                fontWeight="$normal"
              >
                Categoria: {actualItem?.area.title}
              </Heading>
              <Box flexDirection="row">
                <Text>Prioridad: </Text>
                <Badge
                  variant="outline"
                  action={actualItem?.priority.color}
                  borderRadius="$full"
                >
                  <BadgeText>{actualItem?.priority.title}</BadgeText>
                </Badge>
              </Box>
            </Box>
          </ActionsheetScrollView>
        </ActionsheetContent>
      </Actionsheet>
    </GluestackUIProvider>
  );
}
