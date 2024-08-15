import { User } from '../../domain/UserDomain';
import { UserRepository } from '../../domain/UserRepository';

export function getUser(userRepository: UserRepository) {
	return async (sub: string): Promise<User | null> => {
		return await userRepository.get(sub);
	};
}
