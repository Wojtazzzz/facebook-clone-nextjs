import { mock } from '@libs/nock';
import { findByText, screen } from '@testing-library/react';
import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { Birthdays } from './Birthdays';
import SingleBirthday from '@mocks/birthdays/single.json';
import DoubleBirthday from '@mocks/birthdays/double.json';
import MoreBirthdays from '@mocks/birthdays/more.json';
import userEvent from '@testing-library/user-event';
import { mockResizeObserver } from '@utils/tests/mockResizeObserver';

describe('Birthdays component', () => {
    const user = userEvent.setup();
    mockResizeObserver();

    it('display properly header', () => {
        mock({
            path: '/api/birthdays',
            data: [],
        });

        renderWithDefaultData(<Birthdays />);

        const header = screen.getByText('Birthdays');

        expect(header).toBeInTheDocument();
    });

    it('render loader when request called', () => {
        mock({
            path: '/api/birthdays',
            data: [],
        });

        renderWithDefaultData(<Birthdays />);

        const loader = screen.getByTestId('birthdays-loader');

        expect(loader).toBeInTheDocument();
    });

    it('render no birthdays info when anyone has birthday', async () => {
        mock({
            path: '/api/birthdays',
            data: [],
        });

        renderWithDefaultData(<Birthdays />);

        const empty = await screen.findByText('No one has birthdays today');

        expect(empty).toBeInTheDocument();
    });

    it('render error when response return error', async () => {
        mock({
            path: '/api/birthdays',
            status: 500,
        });

        renderWithDefaultData(<Birthdays />);

        const error = await screen.findByText('Something went wrong');

        expect(error).toBeInTheDocument();
    });

    it('render properly single birthday', async () => {
        mock({
            path: '/api/birthdays',
            data: SingleBirthday,
        });

        renderWithDefaultData(<Birthdays />);

        const user = await screen.findByText(SingleBirthday[0].name);
        const text = await screen.findByText(/s birthday is today./);

        expect(user).toBeInTheDocument();
        expect(text).toBeInTheDocument();
    });

    it('render properly double birthday', async () => {
        mock({
            path: '/api/birthdays',
            data: DoubleBirthday,
        });

        renderWithDefaultData(<Birthdays />);

        const firstUser = await screen.findByText(DoubleBirthday[0].name);
        const and = await screen.findByText(/and/);
        const secondUser = await screen.findByText(DoubleBirthday[1].name);
        const text = await screen.findByText(/'s birthday is today./);

        expect(firstUser).toBeInTheDocument();
        expect(and).toBeInTheDocument();
        expect(secondUser).toBeInTheDocument();
        expect(text).toBeInTheDocument();
    });

    it('render properly more birthday', async () => {
        mock({
            path: '/api/birthdays',
            data: MoreBirthdays,
        });

        renderWithDefaultData(<Birthdays />);

        const firstUser = await screen.findByText(MoreBirthdays[0].name);
        const comma = await screen.findByText(/,/);
        const secondUser = await screen.findByText(MoreBirthdays[1].name);
        const and = await screen.findByText(/and/);
        const more = await screen.findByText(`${MoreBirthdays.length - 2} more`);
        const text = await screen.findByText(/'s birthday is today./);

        expect(firstUser).toBeInTheDocument();
        expect(comma).toBeInTheDocument();
        expect(secondUser).toBeInTheDocument();
        expect(and).toBeInTheDocument();
        expect(more).toBeInTheDocument();
        expect(text).toBeInTheDocument();
    });

    it('not render tooltip by default', () => {
        mock({
            path: '/api/birthdays',
            data: MoreBirthdays,
        });

        renderWithDefaultData(<Birthdays />);

        const tooltip = screen.queryByTestId('birthday-tooltip');

        expect(tooltip).not.toBeInTheDocument();
    });

    it('render tooltip when hover on xxx more', async () => {
        mock({
            path: '/api/birthdays',
            data: MoreBirthdays,
        });

        renderWithDefaultData(<Birthdays />);

        const more = await screen.findByText(`${MoreBirthdays.length - 2} more`);

        await user.hover(more);

        const tooltip = await screen.findByTestId('birthday-tooltip');

        expect(tooltip).toBeInTheDocument();
    });

    it('tooltip render rest of birtday users', async () => {
        mock({
            path: '/api/birthdays',
            data: MoreBirthdays,
        });

        renderWithDefaultData(<Birthdays />);

        const more = await screen.findByText(`${MoreBirthdays.length - 2} more`);

        const thirdUser = screen.queryByText(MoreBirthdays[2].name);
        const fourthUser = screen.queryByText(MoreBirthdays[3].name);
        const fivethUser = screen.queryByText(MoreBirthdays[4].name);

        expect(thirdUser).not.toBeInTheDocument();
        expect(fourthUser).not.toBeInTheDocument();
        expect(fivethUser).not.toBeInTheDocument();

        await user.hover(more);

        MoreBirthdays.forEach(async (birthday, i) => {
            if (i < 2) return;

            const user = await screen.findByText(birthday.name);

            expect(user).toBeVisible();
        });
    });
});
