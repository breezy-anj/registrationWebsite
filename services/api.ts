import { registerAction, getRegistrationByToken, type RegisterState, type RegistrationData } from '@/app/actions/register';

export interface MemberPayload {
  name: string;
  email: string;
  phone: string;
  roll: string;
  institution: string;
  year: string;
  branch: string;
}

export interface RegistrationSubmission {
  team_name: string;
  members: MemberPayload[];
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
}

/**
 * Validates and submits registration data through the backend Server Action
 */
export async function submitRegistration(data: RegistrationSubmission): Promise<ApiResponse<RegisterState>> {
  try {
    const formData = new FormData();
    formData.set('team_name', data.team_name.trim());
    formData.set('member_count', data.members.length.toString());

    data.members.forEach((member, index) => {
      formData.set(`m${index}_name`, member.name.trim());
      formData.set(`m${index}_email`, member.email.trim().toLowerCase());
      formData.set(`m${index}_phone`, member.phone.trim());
      formData.set(`m${index}_roll`, member.roll.trim());
      formData.set(`m${index}_institution`, member.institution.trim());
      formData.set(`m${index}_year`, member.year.trim());
      formData.set(`m${index}_branch`, member.branch.trim());
    });

    const response = await registerAction(null, formData);

    if (response.success) {
      return {
        success: true,
        data: response,
      };
    } else {
      return {
        success: false,
        message: response.message || 'Registration failed. Please check your submission.',
        errors: response.errors,
      };
    }
  } catch (error) {
    console.error('API service submit error:', error);
    return {
      success: false,
      message: 'A network error occurred while connecting to the server. Please check your internet connection.',
    };
  }
}

/**
 * Retrieves registration details using a registration token
 */
export async function fetchRegistrationByToken(token: string): Promise<ApiResponse<RegistrationData>> {
  try {
    if (!token || !token.trim()) {
      return { success: false, message: 'Invalid token provided.' };
    }

    const response = await getRegistrationByToken(token.trim());

    if (response.success && response.registration) {
      return {
        success: true,
        data: response.registration,
      };
    } else {
      return {
        success: false,
        message: response.message || 'Registration records not found for this token.',
      };
    }
  } catch (error) {
    console.error('API service token fetch error:', error);
    return {
      success: false,
      message: 'Failed to retrieve registration pass details.',
    };
  }
}
