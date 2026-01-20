import { BottomActionBar, Flex, Layout } from '@atelier-mold/admin';

type Props = {
    left?: React.ReactNode | undefined;
    right?: React.ReactNode | undefined;
}

const BottomButtonLayout = ({ left, right }: Props) => {
    return (
        <Layout.BottomBar>
            <BottomActionBar>

            {left && (
                <BottomActionBar.Left>
                    <Flex gap="100">
                        {left}
                    </Flex>
                </BottomActionBar.Left>
            )}

            {right && (
                <BottomActionBar.Right>
                    <Flex gap="100">
                        {right}
                    </Flex>
                </BottomActionBar.Right>
            )}

            </BottomActionBar>
        </Layout.BottomBar>
    );
}

export default BottomButtonLayout;