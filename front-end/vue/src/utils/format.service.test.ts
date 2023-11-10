import { FormatService } from './format.service';

describe('FormatService', () => {
    describe('formatDate', () => {
        it('should format the date correctly', () => {
            const date = new Date('2022-01-01T00:00:00.000Z');
            const formattedDate = FormatService.formatDate(date, 'yyyy-MM-dd');
            expect(formattedDate).toEqual('2022-01-01');
        });
    });
});
