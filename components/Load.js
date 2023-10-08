import { HStack, Spinner, Heading } from "native-base"
export function Load(){
    return(
        <HStack space={2} justifyContent="center">
            <Spinner _light={{color: "darkBlue.700"}} accessibilityLabel="Loading posts" />
            <Heading _dark={{color: "primary.500"}}
            _light={{color: "darkBlue.700"}}
            fontSize="md">
                Loading
            </Heading>
        </HStack>
    )
}